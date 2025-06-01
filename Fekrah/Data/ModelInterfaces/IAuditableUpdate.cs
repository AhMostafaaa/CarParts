using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.ModelInterfaces
{
    public interface IAuditableUpdate
    {
        int? UpdatedBy { get; set; }
        DateTimeOffset? UpdatedOn { get; set; }
    }
}
