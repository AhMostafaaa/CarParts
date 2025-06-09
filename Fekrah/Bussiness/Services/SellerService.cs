using AutoMapper;
using Bussiness.Services;
using Data;
using Microsoft.EntityFrameworkCore;

public class SellerService : _BusinessService<Seller, SellerDto>, ISellerService
{
    public SellerService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        
    }
}

