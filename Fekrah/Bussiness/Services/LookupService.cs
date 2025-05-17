using Bussiness.Interfaces;
using Data.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Services
{
    public class LookupService : ILookupService
    {
        private readonly IUnitOfWork _unitOfWork;

        public LookupService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public List<LookupDTO> GetLookUpDetails(string lookupName)
        {
            List<LookupDTO> result = new();

            switch (lookupName.ToLower())
            {
                case "categories":
                    result = _unitOfWork.Categories
                        .GetAllAsync().Result
                        .Select(c => new LookupDTO
                        {
                            Id = c.Id,  
                            Text = c.Name,
                        }).ToList();
                    break;

                case "parts":
                    result = _unitOfWork.Parts
                        .GetAllAsync().Result
                        .Select(c => new LookupDTO
                        {
                            Id = c.Id,
                            Text = c.Name,
                        }).ToList();
                    break;

                case "sellers":
                    result = _unitOfWork.Sellers
                        .GetAllAsync().Result
                        .Select(c => new LookupDTO
                        {
                            Id = c.Id,
                            Text = c.ShopName,
                        }).ToList();
                    break;
                default:
                    break;
            }


            return result;
        }
    }
}
