using Domain.DTO;
using Domain.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UI.Controllers;
using Xunit;

namespace UnitTest.Assignment
{
    [TestClass]
    public class UserActivityControllerTest
    {
        [Fact]
        [TestMethod]
        public async Task GetAllActivities()
        {
            var mockRepo = new Mock<IUserActivityService>();

            var controller = new UserActivityController(mockRepo.Object);

            var result = await controller.GetAllActivities();

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result,typeof(OkObjectResult));
        }

        [Fact]
        [TestMethod]
        public async Task AddUserActivity()
        {
            var mockRepo = new Mock<IUserActivityService>();

            var controller = new UserActivityController(mockRepo.Object);

            var result = await controller.AddUserActivity(new UserActivityDTO()
            {
                Activity = "some Activity",
                Comments = "some comment",
                Email = "email",
                FirstName = "First Name",
                LastName = "Last Name"
            });

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [Fact]
        [TestMethod]
        public async Task AddUserActivity_InvalidInputData()
        {
            var mockRepo = new Mock<IUserActivityService>();

            var controller = new UserActivityController(mockRepo.Object);
            controller.ModelState.AddModelError("Email", "The Email field is required.");

            var result = await controller.AddUserActivity(new UserActivityDTO()
            {
                Activity = "",
                Comments = "some comment",
                FirstName = "First Name",
                LastName = "Last Name"
            });

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }
    }
}
