import useAxios from "axios-hooks"
import { baseUrl } from "../components"

export const useHeroes = () => {
  const [{ data: getData, loading: getLoading, error: getError }, execute] = useAxios(
    baseUrl
  )
  return {
    getData, getLoading, getError, execute
  }
}