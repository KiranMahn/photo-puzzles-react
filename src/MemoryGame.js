import {Link} from 'react-router-dom';
import { View, Image, Pressable, Text } from 'react-native-web';
const MemoryGame = () => {
    return (
        <View style={{height: '100vh', display: 'flex'}}>
            <View style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100vw'}}>
                    <View style={{margin: '1em', width: '10%'}}>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Text style={{fontSize: '36px', fontWeight: 'bold'}}>&larr;</Text>
                        </Link>
                    </View>
                    <Text style={{textAlign: 'center', fontSize: 'xx-large', fontFamily: 'Arvo-Bold, serif', borderBottomWidth:'1px', padding: '0.5em', borderBlockColor: 'lightgray'}}> Memory Game </Text>
                    <Pressable style={{margin: '1em', width: '10%'}}>
                        <Text style={{textAlign: 'center', fontSize: 'large', fontFamily: 'Arvo-Bold, serif', padding: '0.5em'}}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default MemoryGame; 