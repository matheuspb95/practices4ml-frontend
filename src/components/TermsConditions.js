import { Layer, Box, Text } from "grommet";
import ConfirmButton from "./ConfirmButton";

const TermsConditions = (props) => {
  return (
    <Layer
      onEsc={() => props.setShowTerms(false)}
      onClickOutside={() => props.setShowTerms(false)}
    >
      <Box
        height="large"
        width="large"
        pad="medium"
        gap="medium"
        overflow={{ vertical: "scroll" }}
      >
        <Text size="large" weight="bold">
          Use Terms for Sepractices4ml
        </Text>
        <Text>
          The information and documents made available through this
          SEPractices4ML web platform will be available to users who follow the
          following conditions described below:
        </Text>
        <Text size="large" weight="bold">
          Binding and Acceptance of the Terms of Use
        </Text>
        <Text>
          Users will be bound by these Terms of Use by checking the option{" "}
          <Text weight="bold">“I agree with the terms and conditions”</Text>,
          during the creation of their user account to access and submit
          practices to the SEPractices4ML web platform. By using the platform,
          through its functionalities, Users declare that they agree with these
          conditions.
        </Text>
        <Text>
          Therefore, it is recommended that Users read this document carefully,
          and if they do not agree with any of the conditions set forth herein,
          they must refrain from creating their account to access the
          SEPractices4ML web platform.
        </Text>
        <Text size="large" weight="bold">
          Responsibility for the use of the web platform
        </Text>
        <Text>
          Users are solely responsible for their use of SEPractices4ML and for
          any consequences they may cause.
        </Text>
        <Text size="large" weight="bold">
          Copyright
        </Text>
        <Text>
          All content included or made available on the SEPractices4ML web
          platform, such as texts, files, images, among others, constitutes
          property of SEPractices4ML and the authors of the practices who are
          active members of the platform and have agreed to publish their
          content. Therefore, the content is protected by the SEpractices4ML web
          platform and users retain the copyright on such content.
        </Text>
        <Text size="large" weight="bold">
          Authorization and Access
        </Text>
        <Text>
          Filling in the registration data and choosing a password, on the
          homepage of the SEPractices4ML web platform, will create an account
          for the User. This will be your way of identifying and accessing the
          features and content made available on the web platform.
        </Text>
        <Text>
          To create an account on the web platform, the User is aware that he
          must provide some personal data, such as his full name, a valid email
          address, and any other information necessary to complete the
          registration process, being also responsible for the accuracy of the
          information provided.
        </Text>
        <Text>
          The User, from now on, authorizes the SEPractices4ML web platform to
          send notifications and emails to the registered email address or
          perform other necessary operations. In addition, the User will be able
          to share the link of the practice registered on the platform on social
          networks informed by the User or previously registered in his/her
          profile.
        </Text>
        <Text>
          In case of loss of password or knowledge of the User's personal
          password by third parties, the User undertakes to change it, under
          penalty of being liable for legitimate accesses, with the regular use
          of the personal and non-transferable password.
        </Text>
        <Text size="large" weight="bold">
          Comments
        </Text>
        <Text>
          The SEpractices4ML web platform allows its Users to express their
          opinions regarding registered practices. However, such comments should
          not be taken as an official manifestation of the platform, but as a
          declaration of experience by the Users themselves made spontaneously
          and collaboratively.
        </Text>
        <Text>
          It is the sole responsibility of each User the content posted
          referring to their comments and statements.
        </Text>
        <Text>
          A plataforma web SEPractices4ML não se responsabiliza pelo conteúdo
          dos comentários declarados por seus Usuários. Entretanto, se
          necessário for, a SEPractices4ML se reserva o direito de reprovar,
          restringir ou eliminar comentários em desacordo com o propósito de
          avaliação das práticas.
        </Text>
        <Text size="large" weight="bold">
          Agreement
        </Text>
        <Text>
          By accepting these terms, the User declares that he has read and
          understood them in their entirety.
        </Text>
        <ConfirmButton
          alignSelf="center"
          label="close"
          onClick={() => props.setShowTerms(false)}
        />
      </Box>
    </Layer>
  );
};

export default TermsConditions;
