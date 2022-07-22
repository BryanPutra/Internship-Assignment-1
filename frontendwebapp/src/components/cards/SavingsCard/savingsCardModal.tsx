import * as React from 'react';

interface ISavingsCardModalProps {
}

const SavingsCardModal: React.FunctionComponent<ISavingsCardModalProps> = (props) => {

    const onArrowDownClicked = () =>{
        return 
    }

  return (
    <div className='flex flex-col items-center'>
        <div className='' onClick={onArrowDownClicked}>{`arrow down icon`}</div>
        <div>Saving Details</div>
        <div>

        </div>
    </div>
  );
};

export default SavingsCardModal;
