using MapMarkers.Models;
using Microsoft.EntityFrameworkCore;

namespace MapMarkers.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }


        public DbSet<Marker> Markers { get; set; }
    }

}
