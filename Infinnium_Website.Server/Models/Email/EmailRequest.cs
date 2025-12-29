namespace Infinnium_Website.Server.Models.Email
{
    public class EmailRequest
    {
        public string User { get; set; }
        public string Receiver { get; set; }
        public string Subject { get; set; }
        public DateTime currentTimeStamp { get; set; }
    }
}
