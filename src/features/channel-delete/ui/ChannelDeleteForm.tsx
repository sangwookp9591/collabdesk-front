'use client';

import { ChangeEvent, useState } from 'react';
import * as styles from '@/shared/styles/form-basic.css';
import { themeTokens } from '@/shared/styles';
import { useDeleteChannel } from '@/entities/channel/model/channel.queries';

interface CreateFormProps {
  id: string;
  name: string;
  onSuccess?: () => void;
}

export default function ChannelDeleteForm({ id, name, onSuccess }: CreateFormProps) {
  const [value, setValue] = useState('');
  const [isReady, setIsReady] = useState(false);

  const { mutate: deleteChannel, isPending } = useDeleteChannel(id, onSuccess);
  const onSubmit = () => {
    if (isReady && isPending) {
      deleteChannel();
    }
  };

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (name === e.target.value) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
    setValue(e.target.value);
  };
  return (
    <>
      <div>
        <h3>채널 삭제</h3>
        <div className={styles.formStyle}>
          <label htmlFor="name">Name</label>
          <input
            required
            className={styles.inputStyle}
            name="name"
            placeholder="삭제할 채널이름을 입력해주세요."
            value={value}
            onChange={onChangeValue}
          ></input>

          <div className={styles.deleteMessageStyle}>
            {`삭제하려면 `}
            <strong
              style={{
                color: themeTokens.colors.status.error.color,
              }}
            >
              {name}
            </strong>
            {` 을(를) 입력하세요`}
          </div>
          <input name="channelId" value={id} hidden readOnly />
          <div
            className={isReady ? styles.buttonStyle : styles.disableButtonStyle}
            onClick={onSubmit}
          >
            삭제하기
          </div>
        </div>
      </div>
    </>
  );
}
