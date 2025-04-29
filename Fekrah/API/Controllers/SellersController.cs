using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class SellersController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public SellersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // GET: api/Sellers
    [HttpGet("GetAll")]
    [ProducesResponseType(typeof(IEnumerable<SellerViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<SellerViewModel>>> GetAll()
    {
        var sellers = await _unitOfWork.Sellers.GetAllAsync();

        if (sellers == null || !sellers.Any())
            return NotFound("No sellers found.");

        return Ok(sellers);
    }

    // GET: api/Sellers/{id}
    [HttpGet("GetById")]
    [ProducesResponseType(typeof(SellerViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SellerViewModel>> GetById(int id)
    {
        var seller = await _unitOfWork.Sellers.GetByIdAsync(id);

        if (seller == null)
            return NotFound($"Seller with ID {id} not found.");

        return Ok(seller);
    }

    // POST: api/Sellers
    [HttpPost]
    [ProducesResponseType(typeof(SellerViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<SellerViewModel>> Create([FromBody] SellerDto dto)
    {
        if (dto == null)
            return BadRequest("Seller data is required.");

         await _unitOfWork.Sellers.AddAsync(dto);
        await _unitOfWork.CompleteAsync();

        return StatusCode(StatusCodes.Status201Created);
    }

    // PUT: api/Sellers/{id}
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] SellerDto dto)
    {
        var existingSeller = await _unitOfWork.Sellers.GetByIdAsync(id);
        if (existingSeller == null)
            return NotFound($"Seller with ID {id} not found.");

        await _unitOfWork.Sellers.UpdateAsync(id, dto);
        await _unitOfWork.CompleteAsync();

        return NoContent();
    }

    // DELETE: api/Sellers/{id}
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var existingSeller = await _unitOfWork.Sellers.GetByIdAsync(id);
        if (existingSeller == null)
            return NotFound($"Seller with ID {id} not found.");

        await _unitOfWork.Sellers.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();

        return NoContent();
    }
}
