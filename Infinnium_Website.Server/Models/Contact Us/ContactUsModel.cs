namespace Infinnium_Website.Server.Models.Contact_Us
{
    public class ContactUsModel
    {
        public string? FirstName { get; set; }
        //public string? LastName { get; set; }
        public string? Email { get; set; }
        //public string? Phone { get; set; }
        public string? Message { get; set; }
        public bool isActive { get; set; }
        public bool isMailSent { get; set; }
        public string? Guid { get; set; }
        public string? CreatedAt { get; set; }

    }
}
