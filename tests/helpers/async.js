/**
 * Created by supervlad on 12/11/16.
 */

export default (fn) => async () => {
  try {
    await fn()
  }
  catch (err) {
    console.log(err)
  }
}
