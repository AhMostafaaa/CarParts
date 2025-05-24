using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.ModelInterfaces
{
    public interface IAuditableDelete
    {
        int? DeletedBy { get; set; }
        DateTimeOffset? DeletedOn { get; set; }
    }
}
