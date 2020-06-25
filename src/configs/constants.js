import * as yup from 'yup';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'Banner/default.png';
export const banner = ['images/cloud.jpg', 'images/dns-server.png', 'images/full-stack-web-development.jpg', 'images/load-balancer.png', 'images/js.jpg'];
export const total = 5;
export const SelectOptions = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];
export const RadioCricket = [
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'Wicket-keeper',
    value: 'wicket-keeper',
  },
  {
    label: 'All-Rounder',
    value: 'all-rounder',
  },
];
export const RadioFootball = [
  {
    label: 'Striker',
    value: 'striker',
  },
  {
    label: 'Defender',
    value: 'defender',
  },
];
const LoginSchema = yup.object().shape({
  email: yup.string().email().label('Email').required('email is required'),
  password: yup.string().label('Password').required('password is required'),
});
export const Schema = yup.object().shape({
  name: yup.string().required('name is required field').min(3),
  email: yup.string().email().required('email is required '),
  password: yup.string().required('password is required ')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'must contain 8 character, atleast one uppercase letter,one lowercase letter and one number'),
  confirmPassword: yup.string().required('confirm password is required')
    .oneOf([yup.ref('password'), null], 'password must match'),
});
export const useStyles = (theme) => ({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(-6),
  },
  form: {
    width: '90%',
    marginTop: theme.spacing(1),
  },
  box: {
    marginTop: theme.spacing(10),
    width: '30%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});
export default LoginSchema;
