using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Bussiness.Interfaces
{
    public interface ISessionService
    {
        HttpContext HttpContext { get; set; }
        string? UserId { get; }
        string? UserName { get; }
        int? UserType { get; }
    }
}
