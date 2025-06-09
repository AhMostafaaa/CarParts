using Bussiness.Interfaces;
using Data.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class PartRepository : GeneraicRepository<Part>, IPartRepository
    {
        public PartRepository(DatabaseContext context, ISessionService sessionService) : base(context, sessionService)
        {
            
        }
    }
}
