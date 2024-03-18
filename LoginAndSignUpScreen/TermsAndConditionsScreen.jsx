import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';

const TermsAndConditions = () => {
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  const handleScroll = ({layoutMeasurement, contentOffset, contentSize}) => {
    const newProgress = Math.min(
      100,
      (contentOffset.y / (contentSize.height - layoutMeasurement.height - 20)) *
        100,
    );
    if (newProgress !== progress) {
      setProgress(newProgress);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>Terms and Conditions</Text>
      <ScrollView
        style={styles.scrollView}
        onScroll={({nativeEvent}) => handleScroll(nativeEvent)}>
        <Text style={styles.textContent}>
          Welcome to TaskAway! These Terms and Conditions govern your use of the
          TaskAway mobile application hereinafter referred to as the TaskAway,
          which is owned and operated by TaskAway . By accessing or using the
          Application, you agree to be bound by these Terms and Conditions. If
          you do not agree with any part of these terms, you must not use the
          Application. {'\n\n'}
          To access certain features of the Application, you may be required to
          create an account. You agree to provide accurate, current, and
          complete information during the registration process and to update
          such information to keep it accurate, current, and complete. We
          reserve the right to suspend or terminate your account if any
          information provided during the registration process or thereafter
          proves to be inaccurate, not current, or incomplete.{'\n\n'}
          Subject to your compliance with these Terms and Conditions, we grant
          you a limited, non-exclusive, non-transferable, revocable license to
          download, install, and use the Application for your personal,
          non-commercial purposes strictly in accordance with the Application's
          documentation
          {'\n\n'}
          This website uses cookies to monitor browsing preferences. If you do
          allow cookies to be used, the following personal information may be
          stored by us for use by third parties.Neither we nor any third parties
          provide any warranty or guarantee as to the accuracy, timeliness,
          performance, completeness or suitability of the information and
          materials found or offered on this website for any particular purpose.
          You acknowledge that such information and materials may contain
          inaccuracies or errors and we expressly exclude liability for any such
          inaccuracies or errors to the fullest extent permitted by law.
          {'\n'}
          Your use of any information or materials on this website is entirely
          at your own risk, for which we shall not be liable. It shall be your
          own responsibility to ensure that any products, services or
          information available through this website meet your specific
          requirements. From time to time, this website may also include links
          to other websites. These links are provided for your convenience to
          provide further information. They do not signify that we endorse the
          website(s). We have no responsibility for the content of the linked
          website(s).
          {'\n\n'}
          When You create an account with Us, You must provide Us information
          that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of Your account on Our Service. You are responsible for
          safeguarding the password that You use to access the Service and for
          any activities or actions under Your password, whether Your password
          is with Our Service or a Third-Party Social Media Service.
          {'\n\n'}
          This type of clause is a contractual stipulation or disclaimer for an
          agreement that defines the circumstances under which you (the
          disclaiming party) could be held responsible for damages or loss. It
          further sets the boundaries of damages that may be claimed in certain
          situations. This clause limits the amount payable as well as the
          exposure a company faces if a lawsuit is filed or another claim is
          made. If deemed admissible, a Disclaimer and Limitation of Liability
          clause can "cover" the number of possible losses to which a business
          is exposed. For example, a mobile app user experiences loss because
          they relied on information provided on that app. A Disclaimer and
          Limitation of Liability clause in the app's Terms and Conditions
          agreement could restrict the liability of the app owner, and by
          extension, limit the recoverable amount of the user.
          {'\n\n'}
          Notwithstanding any damages that You might incur, the entire liability
          of the Company and any of its suppliers under any provision of this
          Terms and Your exclusive remedy for all of the foregoing shall be
          limited to the amount actually paid by You through the Service or 100
          USD if You haven't purchased anything through the Service. To the
          maximum extent permitted by applicable law, in no event shall the
          Company or its suppliers be liable for any special, incidental,
          indirect, or consequential damages whatsoever (including, but not
          limited to, damages for loss of profits, loss of data or other
          information, for business interruption, for personal injury, loss of
          privacy arising out of or in any way related to the use of or
          inability to use the Service, third-party software and/or third-party
          hardware used with the Service, or otherwise in connection with any
          provision of this Terms), even if the Company or any supplier has been
          advised of the possibility of such damages and even if the remedy
          fails of its essential purpose.
          {'\n\n'}
          By posting Content to the Service, You grant Us the right and license
          to use, modify, publicly perform, publicly display, reproduce, and
          distribute such Content on and through the Service. You retain any and
          all of Your rights to any Content You submit, post or display on or
          through the Service and You are responsible for protecting those
          rights. You agree that this license includes the right for Us to make
          Your Content available to other users of the Service, who may also use
          Your Content subject to these Terms. You represent and warrant that:
          (i) the Content is Yours (You own it) or You have the right to use it
          and grant Us the rights and license as provided in these Terms, and
          (ii) the posting of Your Content on or through the Service does not
          violate the privacy rights, publicity rights, copyrights, contract
          rights or any other rights of any person.
          {'\n\n'}
          If You wish to place an Order for Products available on the Service,
          You may be asked to supply certain information relevant to Your Order
          including, without limitation, Your name, Your email, Your phone
          number, Your credit card number, the expiration date of Your credit
          card, Your billing address, and Your shipping information. You
          represent and warrant that: (i) You have the legal right to use any
          credit or debit card(s) or other payment method(s) in connection with
          any Order; and that (ii) the information You supply to us is true,
          correct and complete. By submitting such information, You grant us the
          right to provide the information to payment processing third parties
          for purposes of facilitating the completion of Your Order.
          {'\n\n'}
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by the Company. The Company has no
          control over, and assumes no responsibility for, the content, privacy
          policies, or practices of any third party web sites or services. You
          further acknowledge and agree that the Company shall not be
          responsible or liable, directly or indirectly, for any damage or loss
          caused or alleged to be caused by or in connection with the use of or
          reliance on any such content, goods or services available on or
          through any such web sites or services. We strongly advise You to read
          the terms and conditions and privacy policies of any third-party web
          sites or services that You visit. The use of this mobile app is
          subject to the following terms of use.
        </Text>
      </ScrollView>
      <View
        style={[
          styles.progressBar,
          {width: `${progress}%`, opacity: progress / 100},
        ]}
      />
      <TouchableOpacity
        disabled={progress < 100}
        onPress={() => navigation.navigate('SignUp', {accepted: true})}
        style={[styles.button, {opacity: progress >= 100 ? 1 : 0.3}]}>
        <Text style={styles.buttonLabel}>ACCEPT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: scale(20),
  },
  titleContainer: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: verticalScale(20),
  },
  scrollView: {
    flex: 1,
  },
  textContent: {
    fontSize: RFPercentage(2),
    color: '#000',
    textAlign: 'justify',
    lineHeight: 25,
  },
  progressBar: {
    height: verticalScale(5),
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: '#FDAB2F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: verticalScale(30),
    marginTop: verticalScale(20),
  },
  buttonLabel: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default TermsAndConditions;
