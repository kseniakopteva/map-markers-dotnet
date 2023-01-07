using MapMarkers.Data;
using MapMarkers.Models;
using Microsoft.AspNetCore.Mvc;

namespace MapMarkers.Controllers
{
    public class MarkerController : Controller
    {
        private readonly ApplicationDbContext _db;

        public MarkerController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            IEnumerable<Marker> objMarkerList = _db.Markers;
            return View(objMarkerList);
        }
    }
}
