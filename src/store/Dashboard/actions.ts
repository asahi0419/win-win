import { getDashboardAPI } from '../api/Dashboard/DashboardAPI'

const dashboardData = async () => {
  try {
    const response = await getDashboardAPI()
    return response.data
  } catch (error: any) {
    return console.log(error)
  }
}

export { dashboardData }
