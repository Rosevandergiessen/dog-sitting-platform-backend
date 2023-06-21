
const acceptRequest = async (requestId, sitterId) => {


    fetch(`http://localhost:8080/requests/${requestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sitterId)
    })
        .then((response) => response.json())
        .then((updatedRequest) => {
            // Handle the updated request data
            console.log(updatedRequest);
        })
        .catch((error) => {
            // Handle the error
            console.error(error);
        });
};

export default acceptRequest;
