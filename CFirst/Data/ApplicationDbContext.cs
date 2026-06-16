using Microsoft.EntityFrameworkCore;
using CFirst.Models;

namespace CFirst.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Expense> Expenses { get; set; }
    public DbSet<User> Users { get; set; }
}