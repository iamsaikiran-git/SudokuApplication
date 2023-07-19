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
            int[][] board = new int[][]
            { 
                new int[] {5,3,0,0,7,0,0,0,0},
                new int[] {6,0,0,1,9,5,0,0,0},
                new int[] {0,9,8,0,0,0,0,6,0},
                new int[] {8,0,0,0,6,0,0,0,3},
                new int[] {4,0,0,8,0,3,0,0,1},
                new int[] {7,0,0,0,2,0,0,0,6},
                new int[] {0,6,0,0,0,0,2,8,0},
                new int[] {0,0,0,4,1,9,0,0,5},
                new int[] {0,0,0,0,8,0,0,7,9}};
            int[][] board2 = new int[][]
            {
                new int [] { 0,0,8,0,2,0,0,0,0},
                new int [] { 0,0,0,0,5,7,0,2,9},
                new int [] { 0,7,0,0,0,4,3,0,6},
                new int [] { 0,0,5,9,6,0,0,0,0},
                new int [] { 2,9,0,4,7,0,6,5,1},
                new int [] { 7,8,6,3,1,0,0,4,2},
                new int [] { 0,0,0,0,0,6,0,3,0},
                new int [] { 3,2,0,0,4,0,0,0,0},
                new int [] { 8,0,4,0,0,0,2,0,5}
            };

            int[][] board3 = new int[][]
            {
                new int [] {8,3,0,0,0,0,1,0,0},
                new int [] {0,0,0,0,0,2,3,0,0},
                new int [] {1,0,0,0,5,0,0,0,4 },
                new int [] {9,8,0,1,0,5,0,7,2 },
                new int [] {2,5,7,9,0,0,0,3,1 },
                new int [] {6,1,3,7,2,8,0,4,0 },
                new int [] {4,2,0,5,0,1,0,0,3 },
                new int [] {0,7,8,0,0,9,0,0,5 },
                new int [] {0,6,0,4,0,0,0,0,0 }
            };

            int[][] board4 = new int[][]
            {
                new int [] {0,7,0,0,5,0,1,0,2 },
                new int [] {1,6,0,0,0,3,0,0,0 },
                new int [] {5,0,0,2,9,0,0,6,4 },
                new int [] {2,0,4,1,0,0,6,0,0 },
                new int [] {0,0,7,3,0,0,0,1,5 },
                new int [] {0,0,3,0,0,0,4,0,0 },
                new int [] {7,0,0,8,0,0,3,0,0 },
                new int [] {0,0,0,0,6,0,0,7,0 },
                new int [] {0,0,0,4,0,7,0,5,0 }
            };

            int[][] boards5 = new int[][]
            {
                new int [] {0,5,0,4,9,0,6,0,7 },
                new int [] {1,0,0,0,2,6,0,9,0 },
                new int [] {0,9,0,0,0,8,0,0,0 },
                new int [] {0,0,0,1,5,9,3,2,6 },
                new int [] {0,0,0,0,0,0,0,0,9 },
                new int [] {9,0,5,0,0,0,0,0,1 },
                new int [] {0,0,0,0,8,7,0,6,3 },
                new int [] {2,7,0,6,0,3,0,0,0 },
                new int [] {0,6,0,0,0,0,7,1,0 }
            };

            int[][] boards6 = new int[][]
            {
                new int [] {0,1,0,0,0,0,0,4,3 },
                new int [] {0,0,0,8,0,1,0,0,7 },
                new int [] {5,0,0,0,0,3,0,0,8 },
                new int [] {0,7,0,0,0,0,0,1,0 },
                new int [] {0,5,0,0,4,0,0,8,6 },
                new int [] {8,0,6,1,0,7,4,0,2 },
                new int [] {0,0,1,0,0,5,9,0,0 },
                new int [] {9,0,0,0,0,0,2,6,0 },
                new int [] {0,4,7,2,0,0,0,0,0 }
            };

            List<int[][]> boards = new List<int[][]>();
            boards.Add(board);
            boards.Add(board2);
            boards.Add(board3);
            boards.Add(board4);
            boards.Add(boards5);
            boards.Add(boards6);
            return View(boards);
        }
        public IActionResult Index1()
        {
            return View();
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