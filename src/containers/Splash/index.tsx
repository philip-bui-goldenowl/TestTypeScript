import { ScreenName, StorageKey } from "@/constants"
import { User } from "@/types/user"
import { GET_USER } from "@/utils/queries"
import StoredData from "@/utils/StoredData"
import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { View } from "react-native"
import { useDispatch } from "react-redux"
import { setInfoUser } from '@/store/auth/slice';
import { SplashProps } from "@/types/navigation"


const SplashScreen = ({ navigation }: SplashProps) => {

  const dispatch = useDispatch()

  const [GetUser] = useLazyQuery(GET_USER);
  useEffect(() => {
    handleNavigateLogin()
  }, [])

  const handleNavigateLogin = async () => {
    const res = await StoredData.get(StorageKey.memberId)
    if (res) {
      const response = await GetUser({
        variables: {
          _id: res
        }
      })
      if (response.data) {
        const user: User = response.data?.user[0]
        dispatch(setInfoUser(user))

        navigation.navigate(ScreenName.MAIN_TAB)
      }
    } else {

      navigation.navigate(ScreenName.LOGIN)
    }

  }
  return (
    <View />
  )
}

export default SplashScreen