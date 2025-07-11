using AutoMapper;
using Bussiness.Helpers;
using Bussiness.Services;
using Data;
using Data.Enums;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;

public class SellerService : _BusinessService<Seller, SellerDto>, ISellerService
{
    public SellerService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        
    }

    public override DataSourceResult<SellerDto> GetAll(int pageSize, int page, string? searchTerm = null)
    {
        var allSellers = _UnitOfWork.Repository<User>()
            .GetAll()
            .Include(s => s.Seller)
            .ThenInclude(s => s.SellerCategories) 
            .Where(s => s.IsActive &&
                        s.UserType == UserTypeEnum.Seller &&
                    (string.IsNullOrEmpty(searchTerm) || s.Seller.ShopName.Contains(searchTerm)))
            .ToList();

        List<SellerDto> result = allSellers
            .Take(((page - 1) * pageSize)..(page * pageSize))
            .Select(s => new SellerDto
            {
                Id = s.Id,
                ShopName = s.Seller?.ShopName,
                Location = s.Seller?.Location,
                ImageUrl = s.Seller.ImageUrl,
                IsActive = s.IsActive,
                PhoneNumber = s.PhoneNumber,
                Rating = s.Seller.Rating,
                SellerCategories = s?.Seller.SellerCategories?.Select(c => new SellerCategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                }).ToList()
            })
            .ToList();

        return new DataSourceResult<SellerDto>()
        {
            Data = result,
            Count = allSellers.Count
        };
    }
}

