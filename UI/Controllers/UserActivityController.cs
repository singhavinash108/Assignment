using Data.DataContext;
using Domain.DTO;
using Domain.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserActivityController : ControllerBase
    {
        private readonly IUserActivityService _userActivityService;
        public UserActivityController(IUserActivityService userActivityService)
        {
            _userActivityService = userActivityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActivities()
        {
            try
            {
                var result = await _userActivityService.GetAllUserActivities();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddUserActivity(UserActivityDTO modelDTO)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userExists = await _userActivityService.GetIfUserExists(modelDTO);
                    if (userExists)
                    {
                        throw new Exception("User already exists.");
                    }
                    var result = await _userActivityService.AddUserActivity(modelDTO);
                    return Ok(result);
                }
                return BadRequest(ModelState);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
