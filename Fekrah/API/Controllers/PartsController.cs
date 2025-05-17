using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class PartsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public PartsController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    // GET: api/Parts
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<PartViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<PartViewModel>>> GetAll()
    {
        var parts = await _unitOfWork.Parts.GetAllAsync();

        if (parts == null || !parts.Any())
            return NotFound("No parts found.");

        return Ok(parts);
    }

    // GET: api/Parts/{id}
    [HttpGet("GetById")]
    [ProducesResponseType(typeof(PartViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<PartViewModel>> GetById(int id)
    {
        var part = await _unitOfWork.Parts.GetByIdAsync(id);

        if (part == null)
            return NotFound($"Part with ID {id} not found.");

        return Ok(part);
    }

    // POST: api/Parts
    [HttpPost("Create")]
    [ProducesResponseType(typeof(PartViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<PartViewModel>> Create([FromBody] PartDto dto)
    {
        if (dto == null)
            return BadRequest("Part data is required.");

        await _unitOfWork.Parts.AddAsync(dto);
        await _unitOfWork.CompleteAsync();

        return StatusCode(StatusCodes.Status200OK);
    }


    // PUT: api/Parts/{id}
    [HttpPut("Update")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] PartDto dto)
    {
        var existingPart = await _unitOfWork.Parts.GetByIdAsync(id);
        if (existingPart == null)
            return NotFound($"Part with ID {id} not found.");

        await _unitOfWork.Parts.UpdateAsync(id, dto);
        await _unitOfWork.CompleteAsync();

        return NoContent(); // 204: update successful, no content returned
    }

    // DELETE: api/Parts/{id}
    [HttpDelete("Delete")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var existingPart = await _unitOfWork.Parts.GetByIdAsync(id);
        if (existingPart == null)
            return NotFound($"Part with ID {id} not found.");

        await _unitOfWork.Parts.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();

        return NoContent();
    }
}
