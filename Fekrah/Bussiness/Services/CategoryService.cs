using AutoMapper;
using Bussiness.Services;
using Data;
using Microsoft.EntityFrameworkCore;

public class CategoryService : _BusinessService<Category, CategoryDto>, ICategoryService
{
    public CategoryService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {
        
    }
}
