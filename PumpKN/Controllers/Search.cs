using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Xml.Linq;

namespace PumpKN.Controllers
{
    [ApiController]
    [Route("search")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<BeerController> _logger;
        private readonly HttpClient _httpClient;

        public SearchController(ILogger<BeerController> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        [HttpGet("")]
        public async Task<ActionResult<string>> Search(string beer_name = "")
        {
            string apiUrl = "https://api.punkapi.com/v2/beers" + "/?beer_name=" + beer_name;
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
