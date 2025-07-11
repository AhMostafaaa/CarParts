﻿using AutoMapper;
using Bussiness.Helpers;
using Bussiness.Services;
using Data;
using Data.Enums;
using Data.DTOs;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Data.ViewModels;
using Azure;

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
                SellerId = s.Seller.Id,
                UserId = s.Id,
                ShopName = s.Seller?.ShopName,
                Location = s.Seller?.Location,
                ImageUrl = s.Seller.ImageUrl,
                IsActive = s.IsActive,
                PhoneNumber = s.PhoneNumber,
                Rating = s.Seller.Rating,
                Description = s.Seller.Description,
                CityId = s.Seller?.CityId,
                CityName = s.Seller?.City?.NameAr,
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

    public override SellerDto GetById(object id)
    {
        var user = _UnitOfWork.Repository<User>()
            .GetAll()
            .Include(s => s.Seller)
            .ThenInclude(s => s.SellerCategories)
            .FirstOrDefault(s => s.Id == (int)id &&
                        s.IsActive &&
                        s.UserType == UserTypeEnum.Seller);

        if (user is null) return new SellerDto();

        return new SellerDto
        {
            SellerId = user.Seller.Id,
            UserId = user.Id,
            ShopName = user.Seller?.ShopName,
            Location = user.Seller?.Location,
            ImageUrl = user.Seller.ImageUrl,
            IsActive = user.IsActive,
            PhoneNumber = user.PhoneNumber,
            Rating = user.Seller.Rating,
            Description = user.Seller.Description,
            CityId = user.Seller?.CityId,
            CityName = user.Seller?.City?.NameAr,
            SellerCategories = user?.Seller.SellerCategories?.Select(c => new SellerCategoryDto
            {
                Id = c.Id,
                Name = c.Name,
            }).ToList()
        };
    }

    public DataSourceResult<SellerDto> GetAllFilteredSeller(SellerFilterViewModel sellerFilterViewModel)
    {
        var allSellers = _UnitOfWork.Repository<User>()
           .GetAll()
           .Include(s => s.Seller)
           .ThenInclude(s => s.SellerCategories)
           .Where(s => s.IsActive &&
                       s.UserType == UserTypeEnum.Seller &&
                       (!sellerFilterViewModel.Rating.HasValue || (sellerFilterViewModel.Rating.HasValue && s.Seller.Rating == sellerFilterViewModel.Rating)) &&
                       (!sellerFilterViewModel.CityId.HasValue || (sellerFilterViewModel.CityId.HasValue && s.Seller.CityId == sellerFilterViewModel.CityId)) &&
                       (s.Seller.IsFavoritSeller == sellerFilterViewModel.IsFavoritSeller));


        allSellers = (sellerFilterViewModel.OrderType, sellerFilterViewModel.IsDescendingOrder) switch
        {
            (1, true) => allSellers.OrderByDescending(s => s.Seller.ShopName),
            (1, false) => allSellers.OrderBy(s => s.Seller.ShopName),

            (2, true) => allSellers.OrderByDescending(s => s.Seller.Rating),
            (2, false) => allSellers.OrderBy(s => s.Seller.Rating),

            (3, true) => allSellers.OrderByDescending(s => s.CreatedOn),
            (3, false) => allSellers.OrderBy(s => s.CreatedOn),

            _ => allSellers.OrderByDescending(s => s.Id) // default sort
        };


        List<SellerDto> result = allSellers
        .AsEnumerable()
        .Take(((sellerFilterViewModel.Page - 1) * sellerFilterViewModel.PageSize)..(sellerFilterViewModel.Page * sellerFilterViewModel.PageSize))
        .Select(s => new SellerDto
            {
                SellerId = s.Seller.Id,
                UserId = s.Id,
                ShopName = s.Seller?.ShopName,
                Location = s.Seller?.Location,
                ImageUrl = s.Seller.ImageUrl,
                IsActive = s.IsActive,
                PhoneNumber = s.PhoneNumber,
                Rating = s.Seller.Rating,
                Description = s.Seller.Description,
                CityId = s.Seller?.CityId,
                CityName = s.Seller?.City?.NameAr,
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
            Count = allSellers.Count()
        };
    }
}

