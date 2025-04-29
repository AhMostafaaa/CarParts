using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CategoriesController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // GET: api/Categories
    [HttpGet("GetAll")]
    [ProducesResponseType(typeof(IEnumerable<CategoryViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<CategoryViewModel>>> GetAll()
    {
        var categories = await _unitOfWork.Categories.GetAllAsync();

        if (categories == null || !categories.Any())
            return NotFound("No categories found.");

        return Ok(categories);
    }

    // GET: api/Categories/{id}
    [HttpGet("GetById")]
    [ProducesResponseType(typeof(CategoryViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryViewModel>> GetById(int id)
    {
        var category = await _unitOfWork.Categories.GetByIdAsync(id);

        if (category == null)
            return NotFound($"Category with ID {id} not found.");

        return Ok(category);
    }

    // POST: api/Categories
    [HttpPost]
    [ProducesResponseType(typeof(CategoryViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CategoryViewModel>> Create([FromBody] CategoryDto dto)
    {
        if (dto == null)
            return BadRequest("Category data is required.");

         await _unitOfWork.Categories.AddAsync(dto);
        await _unitOfWork.CompleteAsync();

        return StatusCode(StatusCodes.Status201Created);
    }

    // PUT: api/Categories/{id}
    [HttpPut("Update")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryDto dto)
    {
        var existingCategory = await _unitOfWork.Categories.GetByIdAsync(id);
        if (existingCategory == null)
            return NotFound($"Category with ID {id} not found.");

        await _unitOfWork.Categories.UpdateAsync(id, dto);
        await _unitOfWork.CompleteAsync();

        return NoContent();
    }

    // DELETE: api/Categories/{id}
    [HttpDelete("Delete")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var existingCategory = await _unitOfWork.Categories.GetByIdAsync(id);
        if (existingCategory == null)
            return NotFound($"Category with ID {id} not found.");

        await _unitOfWork.Categories.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();

        return NoContent();
    }
}
