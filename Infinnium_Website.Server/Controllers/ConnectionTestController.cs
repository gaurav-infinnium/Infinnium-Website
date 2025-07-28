using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Infinnium_Website.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class ConnectionTestController : Controller
    {
        private readonly ConnectionStringService config;

        public ConnectionTestController(ConnectionStringService config)
        {
            this.config = config;
        }

        // GET: api/contentLoad
        [HttpGet]
        [Route("contentLoad")]
        public IActionResult apiTest()
        {
            try
            {
                string cs = config.GenerateConnection();
                using (SqlConnection con = new SqlConnection(cs))
                {
                    con.Open();
                }
                var response = new
                {
                    apiStatus = "Connected",
                    dbStatus = "Connected",
                    message = "Connection successful"
                };
                return Ok(response);
            }
            catch (Exception ex) 
            {
                var response = new
                {
                    apiStatus = "Connected",
                    dbStatus = "Failed",
                    message = ex.ToString()
                };
                return BadRequest(response);
            }
        }
    }
}
