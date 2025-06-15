using AutoMapper;
using Bussiness.Services;
using Data;
using Microsoft.EntityFrameworkCore;

public class PartService : _BusinessService<Part, PartDto>, IPartService
{
    public PartService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
    {

    }
}
