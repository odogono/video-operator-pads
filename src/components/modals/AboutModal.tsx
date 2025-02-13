import { getCurrentYear } from '@helpers/datetime';
import packageJson from '../../../package.json';
import { CommonModal, CommonModalBase } from './CommonModal';

export const AboutModal = ({ ref }: CommonModalBase) => {
  return (
    <CommonModal ref={ref} showCancel={false}>
      <div className='flex flex-col gap-4'>
        <div className='text-center'>
          <p className=' mb-2 text-xl font-bold'>Video Operator Pads</p>
          <p className=' mb-4'>
            Made with 🤪 by{' '}
            <a href='https://dev.odgn.net'>Alexander Veenendaal</a>
          </p>
          <p className=' mb-4 text-sm'>
            © {getCurrentYear()} Alexander Veenendaal
          </p>
          <div className='text-sm '>Version {packageJson.version}</div>
        </div>
      </div>
    </CommonModal>
  );
};
