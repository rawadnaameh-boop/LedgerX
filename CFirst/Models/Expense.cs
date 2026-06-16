namespace CFirst.Models;

public class Expense
{
    public int Id { get; set; }

    public string Title { get; set; } = "";

    public decimal Amount { get; set; }

    public Guid UserId { get; set; }

    public User? User { get; set; }
}