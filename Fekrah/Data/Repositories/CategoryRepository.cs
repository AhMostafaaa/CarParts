using Bussiness.Interfaces;
using Data.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class CategoryRepository : GeneraicRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DatabaseContext context, ISessionService sessionService) : base(context, sessionService)
        {
            
        }
    }
}
