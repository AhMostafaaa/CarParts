using Bussiness.Interfaces;
using Data.IRepositories;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class SellerCategoryRepository : GeneraicRepository<SellerCategory>, ISellerCategoryRepository
    {
        public SellerCategoryRepository(DatabaseContext context, ISessionService sessionService) : base(context, sessionService)
        {
            
        }
    }
}
