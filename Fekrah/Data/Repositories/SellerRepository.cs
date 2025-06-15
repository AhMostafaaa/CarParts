using Bussiness.Interfaces;
using Data.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class SellerRepository : GeneraicRepository<Seller>, ISellerRepository
    {
        public SellerRepository(DatabaseContext context, ISessionService sessionService) : base(context, sessionService)
        {
            
        }
    }
}
