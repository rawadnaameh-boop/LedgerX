using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CFirst.Data;
using CFirst.Models;
using System.Security.Claims;

namespace CFirst.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ExpensesController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ExpensesController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET: only current user expenses
    [HttpGet]
    public IActionResult Get()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var id = Guid.Parse(userId);

        var expenses = _db.Expenses
            .Where(e => e.UserId == id)
            .ToList();

        return Ok(expenses);
    }

    // POST: automatically assign userId
    [HttpPost]
    public IActionResult Post(Expense expense)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        expense.UserId = Guid.Parse(userId);

        _db.Expenses.Add(expense);
        _db.SaveChanges();

        return Ok(expense);
    }

    // PUT
    [HttpPut("{id}")]
    public IActionResult Put(int id, Expense updatedExpense)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var uid = Guid.Parse(userId);

        var expense = _db.Expenses
            .FirstOrDefault(e => e.Id == id && e.UserId == uid);

        if (expense == null)
            return NotFound();

        expense.Title = updatedExpense.Title;
        expense.Amount = updatedExpense.Amount;

        _db.SaveChanges();

        return Ok(expense);
    }

    // DELETE
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (userId == null)
            return Unauthorized();

        var uid = Guid.Parse(userId);

        var expense = _db.Expenses
            .FirstOrDefault(e => e.Id == id && e.UserId == uid);

        if (expense == null)
            return NotFound();

        _db.Expenses.Remove(expense);
        _db.SaveChanges();

        return Ok();
    }
}