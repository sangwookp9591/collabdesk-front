'use client';

import { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import * as styles from '@/shared/styles/form-basic.css';
import { useWorkspaceStore } from '@/shared/stores/workspace-store';
import { channelCreateAction } from '../model/channel-create-action';

interface CreateFormProps {
  onSuccess?: () => void;
}
type OptionType = {
  name: string;
  value: string;
  description: string;
};

const options: OptionType[] = [
  { name: '공개', value: '1', description: '워크스페이스의 모든 맴버 참여가능' },
  { name: '비공개', value: '0', description: '워크스페이스의 모든 맴버 참여가능' },
];

export default function ChannelCreateForm({ onSuccess }: CreateFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedOption, setSelectOption] = useState<OptionType>(() => options[0]);

  const { getCurrentWorkspaceId } = useWorkspaceStore();
  const [state, formAction, isPending] = useActionState(channelCreateAction, null);

  const onSubmit = () => {
    if (formRef?.current && !isPending) {
      formRef.current.requestSubmit();
    }
  };

  const handleSelectOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const findOption = options?.find((item: OptionType) => item.value === e.target.value);
    setSelectOption(findOption!);
  };

  useEffect(() => {
    if (state?.status) {
      onSuccess?.();
    }
  }, [state?.status, onSuccess]);
  return (
    <>
      <div>
        <h3>채널 생성</h3>
        <form ref={formRef} className={styles.formStyle} action={formAction}>
          <label htmlFor="name">Name</label>
          <input
            required
            className={styles.inputStyle}
            name="name"
            placeholder="이름을 입력해주세요."
          ></input>
          <label htmlFor="name">Description</label>
          <textarea
            className={styles.textAreaStyle}
            name="description"
            style={{
              height: '100px',
              resize: 'none', // 크기 조절 금지
            }}
            placeholder="설명을 입력해주세요."
          ></textarea>
          <label htmlFor="isPublic">Active</label>
          <select
            className={styles.selectStyle}
            value={selectedOption.value}
            name="isPublic"
            onChange={handleSelectOption}
          >
            {options.map((item) => (
              <option key={item?.name} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          <input name="workspaceId" value={getCurrentWorkspaceId() || ''} hidden readOnly />
          <div className={styles.buttonStyle} onClick={onSubmit}>
            생성하기
          </div>
          {state?.error && <div className={styles.errorMessageStyle}>{state.error}</div>}
        </form>
      </div>
    </>
  );
}
