using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Xml.Linq;

namespace PumpKN.Controllers
{
    [ApiController]
    [Route("beer")]
    public class BeerController : ControllerBase
    {
        private readonly ILogger<BeerController> _logger;
        private readonly HttpClient _httpClient;

        public BeerController(ILogger<BeerController> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        [HttpGet("menu")]
        public async Task<ActionResult<string>> Menu(int currentPage, int itemsPerPage)
        {
            string apiUrl = "https://api.punkapi.com/v2/beers";
            if (currentPage != null && itemsPerPage != null)
            {
                if (currentPage > 0 && itemsPerPage > 0)
                {
                    apiUrl += $"?page={currentPage}&per_page={itemsPerPage}";
                }
            }
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }

            return StatusCode((int)response.StatusCode);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> Single(int id = 0)
        {
            string apiUrl = "https://api.punkapi.com/v2/beers/" + id;
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }

            return StatusCode((int)response.StatusCode);
        }
        
        [HttpGet("random")]
        public async Task<ActionResult<string>> Random()
        {
            string apiUrl = "https://api.punkapi.com/v2/beers/random";
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }

            return StatusCode((int)response.StatusCode);
        }

       

    }
}
