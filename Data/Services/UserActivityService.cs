using Domain.DTO;
using Domain.Interface;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Services
{
    public class UserActivityService : IUserActivityService
    {
        private readonly IUserActivityRepository _userActivityRepo;
        public UserActivityService(IUserActivityRepository userActivityRepo)
        {
            _userActivityRepo = userActivityRepo;
        }

        public async Task<UserActivityDTO> AddUserActivity(UserActivityDTO userActivity)
        {
            if (userActivity == null)
            {
                return null;
            }
            try
            {
                var result = await _userActivityRepo.AddUserActivity(new UserActivity
                {
                    Activity = userActivity.Activity,
                    Comments = userActivity.Comments,
                    Email = userActivity.Email,
                    FirstName = userActivity.FirstName,
                    LastName = userActivity.LastName,
                    CreatedDate = DateTime.UtcNow
                });
                return new UserActivityDTO
                {
                    Activity = result.Activity,
                    Comments = result.Comments,
                    Email = result.Email,
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Id = result.Id
                };
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<List<UserActivityDTO>> GetAllUserActivities()
        {
            var result = await _userActivityRepo.GetAllUserActivities();
            return result.OrderByDescending(x => x.CreatedDate).Select(x => new UserActivityDTO()
            {
                Activity = x.Activity,
                Comments = x.Comments,
                Email = x.Email,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Id = x.Id
            }).ToList();
        }

        public async Task<bool> GetIfUserExists(UserActivityDTO userActivity)
        {

            var result = await _userActivityRepo.GetIfUserExists(new UserActivity
            {
                Activity = userActivity.Activity,
                Comments = userActivity.Comments,
                Email = userActivity.Email,
                FirstName = userActivity.FirstName,
                LastName = userActivity.LastName
            });
            return result;

        }



    }
}
