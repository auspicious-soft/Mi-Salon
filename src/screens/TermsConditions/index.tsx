import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../enum/colors.enum';
import ArrowLeft from '../../components/Svgs/ArrowLeft';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  navigation: any;
}
const Index = (props: IProps) => {
  const {navigation} = props;
  return (
    <SafeAreaView>
      <ScrollView>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </Pressable>
          <Text style={styles.title}>Terms & Conditions</Text>
          <View style={styles.scrollView}>
            <Text style={styles.text}>
              Welcome to mi-salon.es! {'\n'}
              {'\n'}These terms and conditions outline the rules and regulations
              for the use of Mi Salon's Website, located at
              https://mi-salon.es/. {'\n'}
              {'\n'}By accessing this website we assume you accept these terms
              and conditions. Do not continue to use mi-salon.es if you do not
              agree to take all of the terms and conditions stated on this page.
              {'\n'}
              {'\n'}
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company's terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. All terms refer to the offer, acceptance and
              consideration of payment necessary to undertake the process of our
              assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client's needs in respect of
              provision of the Company's stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above
              terminology or other words in the singular, plural, capitalization
              and/or he/she or they, are taken as interchangeable and therefore
              as referring to same.
            </Text>
            <Text style={styles.heading}>Cookies</Text>
            <Text style={styles.text}>
              We employ the use of cookies. By accessing mi-salon.es, you agreed
              to use cookies in agreement with the Mi Salon's Privacy Policy.
              Most interactive websites use cookies to let us retrieve the
              user’s details for each visit. Cookies are used by our website to
              enable the functionality of certain areas to make it easier for
              people visiting our website. Some of our affiliate/advertising
              partners may also use cookies.
            </Text>
            <Text style={styles.heading}>License</Text>
            <Text style={styles.text}>
              Unless otherwise stated, Mi Salon and/or its licensors own the
              intellectual property rights for all material on mi-salon.es. All
              intellectual property rights are reserved. You may access this
              from mi-salon.es for your own personal use subjected to
              restrictions set in these terms and conditions. You must not:
              {'\n'}
              {'\n'}- Republish material from mi-salon.es
              {'\n'}
              {'\n'}-Sell, rent or sub-license material from mi-salon.es
              {'\n'}
              {'\n'}-Reproduce, duplicate or copy material from mi-salon.es
              {'\n'}
              {'\n'}-Redistribute content from mi-salon.es
              {'\n'}
              {'\n'}This Agreement shall begin on the date hereof. Our Terms and
              Conditions were created with the help of the Free Terms and
              Conditions Generator.Parts of this website offer an opportunity
              for users to post and exchange opinions and information in certain
              areas of the website. Mi Salon does not filter, edit, publish or
              review Comments prior to their presence on the website. Comments
              do not reflect the views and opinions of Mi Salon,its agents
              and/or affiliates. Comments reflect the views and opinions of the
              person who post their views and opinions. To the extent permitted
              by applicable laws, Mi Salon shall not be liable for the Comments
              or for any liability, damages or expenses caused and/or suffered
              as a result of any use of and/or posting of and/or appearance of
              the Comments on this website.
              {'\n'}
              {'\n'}
              Mi Salon reserves the right to monitor all Comments and to remove
              any Comments which can be considered inappropriate, offensive or
              causes breach of these Terms and Conditions.
              {'\n'}
              {'\n'}
              -You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
              {'\n'}
              {'\n'}-The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
              {'\n'}
              {'\n'}-The Comments do not contain any defamatory, libelous,
              offensive, indecent or otherwise unlawful material which is an
              invasion of privacy
              {'\n'}
              {'\n'}-The Comments will not be used to solicit or promote
              business or custom or present commercial activities or unlawful
              activity.
              {'\n'}
              {'\n'}
              You hereby grant Mi Salon a non-exclusive license to use,
              reproduce, edit and authorize others to use, reproduce and edit
              any of your Comments in any and all forms, formats or media.
            </Text>
            <Text style={styles.heading}>Hyperlinking to our Content</Text>
            <Text style={styles.text}>
              The following organizations may link to our Web site without prior
              written approval:
              {'\n'}
              {'\n'}
              -Government agencies;
              {'\n'}
              {'\n'}
              -Search engines;
              {'\n'}
              {'\n'}
              -News organizations;
              {'\n'}
              {'\n'}
              -Online directory distributors may link to our Website in the same
              manner as they hyperlink to the Websites of other listed
              businesses; and
              {'\n'}
              {'\n'}
              -System wide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
              {'\n'}
              {'\n'}
              These organizations may link to our home page, to publications or
              to other Website information so long as the link: (a) is not in
              any way deceptive; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and its products
              and/or services; and (c) fits within the context of the linking
              party’s site.
              {'\n'}
              {'\n'}
              We may consider and approve other link requests from the following
              types of organizations:
              {'\n'}
              {'\n'}
              -commonly-known consumer and/or business information sources;
              {'\n'}
              {'\n'}
              -dot.com community sites;
              {'\n'}
              {'\n'}
              -associations or other groups representing charities;
              {'\n'}
              {'\n'}
              -online directory distributors;
              {'\n'}
              {'\n'}
              -internet portals;
              {'\n'}
              {'\n'}
              -accounting, law and consulting firms; and
              {'\n'}
              {'\n'}
              -educational institutions and trade associations.
              {'\n'}
              {'\n'}
              We will approve link requests from these organizations if we
              decide that: (a) the link would not make us look unfavorably to
              ourselves or to our accredited businesses; (b) the organization
              does not have any negative records with us; (c) the benefit to us
              from the visibility of the hyperlink compensates the absence of Mi
              Salon; and (d) the link is in the context of general resource
              information.{'\n'}
              {'\n'} These organizations may link to our home page so long as
              the link: (a) is not in any way deceptive; (b) does not falsely
              imply sponsorship, endorsement or approval of the linking party
              and its products or services; and (c) fits within the context of
              the linking party’s site. {'\n'}
              {'\n'}If you are one of the organizations listed in paragraph 2
              above and are interested in linking to our website, you must
              inform us by sending an e-mail to Mi Salon. Please include your
              name, your organization name, contact information as well as the
              URL of your site, a list of any URLs from which you intend to link
              to our Website, and a list of the URLs on our site to which you
              would like to link. Wait 2-3 weeks for a response.
              {'\n'}
              {'\n'}
              Approved organizations may hyperlink to our Website as follows:
              {'\n'}
              {'\n'}
              -By use of our corporate name; or
              {'\n'}
              {'\n'}
              -By use of the uniform resource locator (URL) being linked to; or
              {'\n'}
              {'\n'}
              -By use of any other description of our business or products and
              services which can be reasonably assumed to be associated with the
              URL being linked to.
              {'\n'}
              {'\n'}
              No use of Mi Salon's logo or other artwork will be allowed for
              linking absent a trademark license agreement.
            </Text>
            <Text style={styles.heading}>iFrames</Text>
            <Text style={styles.text}>
              Without prior approval and written permission, you may not create
              frames around our Web pages or use other techniques that alter in
              any way the visual presentation or appearance of our Website.
            </Text>
            <Text style={styles.heading}>Content Liability</Text>
            <Text style={styles.text}>
              We shall not be hold responsible for any content that appears on
              your Website. You agree to protect and defend us against all
              claims that is rising on your Website. No link(s) should appear on
              any Website that may be interpreted as libelous, obscene or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third party rights.
            </Text>
            <Text style={styles.heading}>Your Privacy</Text>
            <Text style={styles.text}>
              We will not use or share your information with anyone for any
              direct marketing purpose.
            </Text>
            <Text style={styles.heading}>Reservation of Rights</Text>
            <Text style={styles.text}>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right
              to amen these terms and conditions and it’s linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </Text>
            <Text style={styles.heading}>
              Removal of links from our website
            </Text>
            <Text style={styles.text}>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us any moment. We will
              consider requests to remove links but we are not obligated to or
              so or to respond to you directly. We do not ensure that the
              information on this website is correct, we do not warrant its
              completeness or accuracy; nor do we promise to ensure that the
              website remains available or that the material on the website is
              kept up to date.
            </Text>
            <Text style={styles.heading}>Disclaimer</Text>
            <Text style={styles.text}>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties and conditions relating to our website
              and the use of this website. Nothing in this disclaimer will:
              {'\n'}
              {'\n'}
              -limit or exclude our or your liability for death or personal
              injury resulting from negligence;
              {'\n'}
              {'\n'}
              -limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
              {'\n'}
              {'\n'}
              -limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
              {'\n'}
              {'\n'}
              -exclude any of our or your liabilities that may not be excluded
              under applicable law.
              {'\n'}
              {'\n'}
              The limitations and prohibitions of liability set in this Section
              and elsewhere in this disclaimer: (a) are subject to the preceding
              paragraph; and (b) govern all liabilities arising under the
              disclaimer, including liabilities arising in contract, in tort and
              for breach of statutory duty.
              {'\n'}
              {'\n'}
              As for all products sold by us on our website, the sale, use or
              delivery of any product indicates that you accept the risk of loss
              and that you agree to take all reasonable steps to ensure that
              your computer is protected against viruses and other destructive
              programs.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = EStyleSheet.create({
  container: {
    margin: '1rem',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: colors.lightBlack,
    marginVertical: '1rem',
  },
  scrollView: {
    // paddingBottom: '5rem',
  },
  text: {
    fontSize: '.9rem',
    color: '#525252',
    lineHeight: '1rem',
    marginVertical: '1rem',
  },
  heading: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: colors.lightBlack,
    marginVertical: '.3rem',
  },
});
