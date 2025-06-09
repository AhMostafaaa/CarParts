using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class PartsController : _BaseController<Part, PartDto>
{
    public PartsController(IPartService partService) : base(partService)
    {
        
    }
}
