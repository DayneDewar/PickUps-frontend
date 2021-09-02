import { Dropdown, Button } from "semantic-ui-react";

function Notifications({ user, pending, setPending}) {

  function handleRequest(e) {
    e.preventDefault()

    const newPending = pending.filter(friend => {
        return friend.id.toString() !== e.target.value
    })

    setPending(newPending)
    
    if (e.target.id === 'approve') {
        const newFriend = {
            user_id: user.id,
            added_user_id: parseInt(e.target.value)
        }

        fetch(`http://localhost:3000/add_friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFriend)
        })
        .then(r => r.json())
        .then(data => alert('You just accepted a friend'))
      } else if (e.target.id === 'decline') {
        const request = {
            user_id: parseInt(e.target.value),
            added_user_id: user.id
        }

        fetch(`http://localhost:3000/decline_friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
        .then(r => r.json())
        .then(data => alert('You just accepted a friend'))
    }
  } 

  const friendNotifications = pending?.map(friend => {
    return (
      <Dropdown.Item key={friend.id}>
        {friend.firstname} {friend.lastname} has sent you a friend request!
        <Button id='approve' value={friend.id} onClick={handleRequest}>
            Approve
        </Button>
        <Button id='decline' value={friend.id} onClick={handleRequest}>
            Decline
        </Button>
      </Dropdown.Item>
    )
  })

  return (
      friendNotifications
  )
}
 
export default Notifications;