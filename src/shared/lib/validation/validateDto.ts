'use server';

import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

type ValidationResult = {
  status: boolean;
  el?: string | null;
  error?: string | null;
};

export async function validateDto<T extends object>(
  cls: new () => T, //T 타입 객체를 생성할 수 있는 클래스
  data: object,
): Promise<ValidationResult> {
  const instance = plainToInstance(cls, data);

  // 검증 수행
  const errors: ValidationError[] = await validate(instance, { whitelist: true });

  if (errors.length > 0) {
    const firstError = errors[0];
    const constraints = firstError.constraints || {};

    const el = firstError.property;
    const errorMessage = Object.values(constraints)[0];

    return { status: false, el, error: errorMessage };
  }

  return { status: true, el: null, error: null };
}
