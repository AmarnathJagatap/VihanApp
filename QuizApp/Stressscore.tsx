import React, { useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated } from 'react-native'
import { COLORS, SIZES } from './Constants';
import {data} from './Stressdata';
import { Apilink } from '../Constants/Apilink';
import AsyncStorage from '@react-native-async-storage/async-storage';

let token;
const StressScore = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    async function response1(){
        await AsyncStorage.getItem('token').then((value) =>{
            if(value!==null){
              token = JSON.parse(value)
            }
          })
        const response = await fetch(Apilink+ `auth/updatementalscore`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
          body: JSON.stringify({
            "mentalWellnessScore": score
          })
      });
    
      }


    const validateAnswer = (option) => {
        // Increment the score
        if (option.isCorrect) {
          setScore(score + option.isCorrect);
        }
        setShowNextButton(true)
        setIsOptionsDisabled(true);
        setCurrentOptionSelected(option);   
    
      };


    /*const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            // Set Score
            setScore(score+1)
        }
        // Show Next Button
        setShowNextButton(true)
    }*/
    const handleNext = () => {
        response1();
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const restartQuiz = () => {
        setShowScoreModal(false);

        setCurrentQuestionIndex(0);
        setScore(0);

        setCurrentOptionSelected(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }



    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 15
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.black, fontSize: 15, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.black, fontSize: 15, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.black,
                    fontSize: 20
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                        onPress={()=> validateAnswer(option)}
                        disabled={isOptionsDisabled}
                        key={option.id}
                        style={{
                            borderWidth: 3, 
                            borderColor:option==currentOptionSelected?COLORS.success:COLORS.secondary+'40',
                            backgroundColor:  COLORS.secondary+'20',
                            height: 50, borderRadius: 50,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 7
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.black}}>{option.text}</Text>

                            {/* Show Check Or Cross Icon based on correct answer*/}

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, paddingVertical: 10, borderRadius: 20,paddingHorizontal:5
                }}>
                    <Text style={{fontSize: 20, color: COLORS.black, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    return (
       <SafeAreaView style={{
           flex: 1
       }}>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
           <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               backgroundColor: '#fff',
               position:'relative'
           }}>

               {/* ProgressBar */}
               { renderProgressBar() }

               {/* Question */}
               {renderQuestion()}

               {/* Options */}
               {renderOptions()}

               {/* Next Button */}
               {renderNextButton()}

               {/* Score Modal */}
               <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.primary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/50</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>Test Again</Text>
                           </TouchableOpacity>

                       </View>

                   </View>
               </Modal>

               {/* Background Image */}

           </View>
       </SafeAreaView>
    )
}

export default StressScore