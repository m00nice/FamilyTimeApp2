const [Appointment, SetAppointment] = useState([]);
const [Profiles, SetProfiles] = useState([]);

const handleDataFromFirebase = () => {
    //get dataset []
    dataset = [];

    //loop each for id
    //
    //loop values for id
    //
    //create profile button from id and append
        const addProfile = (id, name, color) => {
            const newProfile = (
                <TouchableOpacity onPress={hideApp(id)} style={{top: 3, width: 70, height: 70, borderRadius: 40, backgroundColor: {color}, alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,}}>
                <Image
                style={{width: 50, height: 50, borderRadius: 25,}}
                source={imageURL}
                />
                <Text>{name}</Text>
        </TouchableOpacity>
            )

            SetProfiles(prevProfiles => [... prevProfiles, newProfile])
        }
    //
    //create appointment from id and append
    const appointmentComp = (name, title, startDate, endDate, id, color) => {
        //convert startDate to top
        //convert endDate to height
        name = "yo"
        title = "yo"
        startDate = "yo"
        endDate = "yo"
        const newAppointment = (
        <View id={id} style={{top: 0, right: 0, height: 500, backgroundColor: {color}, position: "absolute", width: 60, right: 100, zIndex: 1,}}>
          <Text>{name}</Text>
          <Text>{title}</Text>
          <Text>{startDate} to {endDate}</Text>
        </View>
        )
  
        SetAppointment(prevAppointments => [... prevAppointments, newAppointment]);
      }

    
}