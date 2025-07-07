using API.Controllers;
using Data.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class SellersController : _BaseController<Seller, SellerDto>
{
    public SellersController(ISellerService sellerService) : base(sellerService)
    {
        
    }
}
