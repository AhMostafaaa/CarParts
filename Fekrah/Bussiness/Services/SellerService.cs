using AutoMapper;
using Bussiness.Helpers;
using Bussiness.Services;
using Data;
using Data.DTOs;
using Microsoft.EntityFrameworkCore;

public class SellerService : _BusinessService<Seller, SellerDto>, ISellerService
{
    public SellerService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        
    }

    public override DataSourceResult<SellerDto> GetAll(int pageSize, int page, string? searchTerm = null)
    {
        var allSellers = _UnitOfWork.Repository<Seller>()
            .GetAll()
            .Include(s => s.SellerCategories)
            .Where(s => s.IsActive &&
                    (string.IsNullOrEmpty(searchTerm) || s.ShopName.Contains(searchTerm)))
            .ToList();

        List<SellerDto> result = allSellers
            .Take(((page - 1) * pageSize)..(page * pageSize))
            .Select(s => new SellerDto
            {
                Id = s.Id,
                ShopName = s.ShopName,
                Location = s.Location,
                ImageUrl = s.ImageUrl,
                IsActive = s.IsActive,
                PhoneNumber = s.PhoneNumber,
                Rating = s.Rating,
                SellerCategories = s?.SellerCategories?.Select(c => new SellerCategoryDto
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

