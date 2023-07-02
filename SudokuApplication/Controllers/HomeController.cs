using Microsoft.AspNetCore.Mvc;
using SudokuApplication.Models;
using System.Diagnostics;
using Newtonsoft.Json;

namespace SudokuApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            int[][] board = new int[][] { new int [] {5,3,0,0,7,0,0,0,0},
new int[] { 6, 0, 0, 1, 9, 5, 0, 0, 0 },
new int[] { 0, 9, 8, 0, 0, 0, 0, 6, 0 },
new int[] { 8, 0, 0, 0, 6, 0, 0, 0, 3 },
new int[] { 4, 0, 0, 8, 0, 3, 0, 0, 1 },
new int[] { 7, 0, 0, 0, 2, 0, 0, 0, 6 },
new int[] { 0, 6, 0, 0, 0, 0, 2, 8, 0 },
new int[] { 0, 0, 0, 4, 1, 9, 0, 0, 5 },
new int[] { 0, 0, 0, 0, 8, 0, 0, 7, 9 }};

            return View(board);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}