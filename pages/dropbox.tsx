import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { Box } from 'components/Common';
import { styled } from 'ui/stiches.config';
import { JWPlayer } from 'components/Player';
// debug
import { playlist } from 'lib/dropbox.config';

const Dropbox: NextPage = () => {
  const [formValues, setFormValues] = useState<{
    url: string;
    cookies: string;
  }>({ url: '', cookies: '' });
  const [error, setError] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Box
      css={{
        backgroundColor: 'Gainsboro',
        height: '100vh',
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          width: '50vw',
          marginX: 'auto',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="url"
            placeholder="Add Dropbox Link"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="cookies"
            placeholder="Add Dropbox Cookies"
            onChange={handleChange}
          />
          <Input type="submit" value="Set Video" />
        </Form>
        <JWPlayer playlist={playlist} />
      </Box>
    </Box>
  );
};

export default Dropbox;

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
});

const Input = styled('input', {
  border: 'none',
  outline: 'none',
  borderBottom: '1px solid DarkGray',
  variants: {
    variant: {
      primary: {
        fontSize: '1.5rem',
        padding: '0.5rem',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
