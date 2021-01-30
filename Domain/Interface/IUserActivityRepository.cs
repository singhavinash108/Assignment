using Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IUserActivityRepository
    {
        Task<List<UserActivity>> GetAllUserActivities();

        Task<UserActivity> AddUserActivity(UserActivity userActivity);

        Task<bool> GetIfUserExists(UserActivity userActivity);
    }
}
