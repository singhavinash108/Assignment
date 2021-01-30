using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DTO
{
    public class UserActivityDTO
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Activity { get; set; }
        [Required]
        public string Comments { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
